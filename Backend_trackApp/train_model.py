import sys
import torch
import torchaudio
import speechbrain as sb
from speechbrain.pretrained import EncoderClassifier
import os
import numpy as np

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
    
    # Process each recording
    embeddings = []
    for audio_file in audio_files:
        file_path = os.path.join(recordings_dir, audio_file)
        try:
            # Load and process audio
            waveform, sample_rate = torchaudio.load(file_path)
            
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
    
    # Calculate mean embedding
    mean_embedding = torch.stack(embeddings).mean(dim=0)
    
    # Save the mean embedding
    save_path = os.path.join(recordings_dir, 'voice_embedding.pt')
    torch.save(mean_embedding, save_path)
    print(f"Voice embedding saved to {save_path}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python train_model.py <username>")
        sys.exit(1)
    
    username = sys.argv[1]
    train_speaker_model(username) 