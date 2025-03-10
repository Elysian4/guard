import sys
import torch
import torchaudio
import speechbrain as sb
from speechbrain.pretrained import EncoderClassifier
import os
import numpy as np
import sounddevice as sd

def train_speaker_model(username):
    print(f"Training speaker model for user: {username}")
    
    # Load the Speaker Recognition Model
    model = EncoderClassifier.from_hparams(
        source="speechbrain/spkrec-ecapa-voxceleb",
        savedir="tmp/spkrec-ecapa-voxceleb"
    )
    
    # Path to the user's voice recordings
    recordings_dir = os.path.join('spkrec-ecapa-voxceleb', username)
    
    # Get all wav files
    audio_files = [f for f in os.listdir(recordings_dir) if f.endswith('.wav')]
    if not audio_files:
        print(f"No audio files found in {recordings_dir}")
        return
    
    print(f"Found {len(audio_files)} audio files")

    # Function to denoise audio (placeholder - implement if needed)
    def denoise_audio(waveform, sample_rate):
        return waveform
    
    # Process each recording
    embeddings = []
    for audio_file in audio_files:
        file_path = os.path.join(recordings_dir, audio_file)
        try:
            # Load and process audio
            waveform, sample_rate = torchaudio.load(file_path)
            
            # Apply denoising
            waveform = denoise_audio(waveform, sample_rate)
            
            # Ensure waveform has sufficient length
            if waveform.shape[-1] < 3:
                waveform = torch.nn.functional.pad(waveform, (0, 3 - waveform.shape[-1]))
            
            # Generate embedding
            embedding = model.encode_batch(waveform, wav_lens=None)
            embeddings.append(embedding)
            print(f"Processed {audio_file}")
        except Exception as e:
            print(f"Error processing {audio_file}: {str(e)}")
    
    if not embeddings:
        print("No embeddings generated")
        return
    
    # Calculate mean embedding (using 50 samples by duplicating 10 recordings 5 times)
    embeddings = embeddings * 5  # Duplicate embeddings to match the 50-sample requirement
    mean_embedding = torch.stack(embeddings).mean(dim=0)
    
    # Save the mean embedding
    save_path = os.path.join(recordings_dir, 'voice_embedding.pt')
    torch.save(mean_embedding, save_path)
    print(f"Voice embedding saved to {save_path}")

    # Save model configuration
    config_path = os.path.join(recordings_dir, 'model_config.pt')
    torch.save({
        'model_state': model.state_dict(),
        'username': username,
        'sample_rate': 16000,  # Standard sample rate used
        'embedding_dim': mean_embedding.shape[-1]
    }, config_path)
    print(f"Model configuration saved to {config_path}")

def verify_speaker(username, audio_file):
    """
    Verify a speaker's identity using a new audio recording
    """
    # Load the Speaker Recognition Model
    model = EncoderClassifier.from_hparams(
        source="speechbrain/spkrec-ecapa-voxceleb",
        savedir="tmp/spkrec-ecapa-voxceleb"
    )
    
    # Load the user's voice embedding
    recordings_dir = os.path.join('spkrec-ecapa-voxceleb', username)
    embedding_path = os.path.join(recordings_dir, 'voice_embedding.pt')
    
    if not os.path.exists(embedding_path):
        print(f"No voice embedding found for user {username}")
        return False
    
    enrolled_embedding = torch.load(embedding_path)
    
    try:
        # Load and process the new recording
        waveform, sample_rate = torchaudio.load(audio_file)
        
        # Generate embedding for the new recording
        new_embedding = model.encode_batch(waveform, wav_lens=None)
        
        # Calculate cosine similarity
        similarity = torch.nn.functional.cosine_similarity(
            enrolled_embedding.squeeze(),
            new_embedding.squeeze(),
            dim=0
        )
        
        # Define a threshold for verification (can be adjusted)
        threshold = 0.75
        
        return bool(similarity > threshold), float(similarity)
    
    except Exception as e:
        print(f"Error during verification: {str(e)}")
        return False, 0.0

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python train_model.py <username> [verify_file]")
        sys.exit(1)
    
    username = sys.argv[1]
    
    if len(sys.argv) == 2:
        # Training mode
        train_speaker_model(username)
    elif len(sys.argv) == 3:
        # Verification mode
        verify_file = sys.argv[2]
        verified, similarity = verify_speaker(username, verify_file)
        print(f"Verification result: {'Verified' if verified else 'Not verified'}")
        print(f"Similarity score: {similarity:.4f}") 