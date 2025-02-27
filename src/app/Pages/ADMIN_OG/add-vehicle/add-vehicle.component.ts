import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css'],
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule,RouterModule ,RouterLink]
})
export class AddVehicleComponent {
  vehicleForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  isUploading: boolean = false;  // Added for upload status

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.vehicleForm = this.fb.group({
      name: ['', Validators.required],
      numberPlate: ['', Validators.required],
      type: ['CAR', Validators.required],
      availableCount: [1, [Validators.required, Validators.min(1)]],
      rentalPrice: [1000, Validators.required],
      totalKmsDriven: [0, Validators.required],
      needsService: ['false', Validators.required],
      lastServiceAt: [0, Validators.required],
      imageUrl: ['']
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      this.isUploading = true;  // Start upload indicator
      const vehicleData = { ...this.vehicleForm.value };

      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        
        this.http.post<{ message: string; fileUrl?: string }>('http://localhost:8080/vehicles/upload', formData).subscribe(
          (response) => {
            if (response.fileUrl) {
              vehicleData.imageUrl = response.fileUrl;
              this.saveVehicle(vehicleData);
            } else {
              alert('File uploaded but no URL received!');
              this.isUploading = false;
            }
          },
          (error) => {
            console.error('Image Upload Error:', error);
            alert('Image upload failed!');
            this.isUploading = false;
          }
        );
      } else {
        this.saveVehicle(vehicleData);
      }
    }
  }

  saveVehicle(vehicleData: any) {
    this.http.post('http://localhost:8080/vehicles/add', vehicleData).subscribe(
      () => {
        alert('Vehicle added successfully!');
        this.vehicleForm.reset();
        this.imagePreview = null;
        this.selectedFile = null;
        this.isUploading = false;
      },
      (error) => {
        console.error('Error:', error);
        alert('Error adding vehicle!');
        this.isUploading = false;
      }
    );
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    this.http.post('http://localhost:8080/vehicles/upload', formData).subscribe({
      next: (response) => console.log('Upload successful', response),
      error: (error) => console.error('Upload failed', error)
    });
  }
  
}
