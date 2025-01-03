import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.css',
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class PasswordGeneratorComponent {
  passwordLength: number = 8;
  generatedPassword: string = '';
  includeAlphabets: boolean = true;
  includeNumbers: boolean = false;
  includeSpecialCharacters: boolean = false;
  copyButtonText: string = 'Copy Password';

  clamp(num: number): number {
    return Math.min(Math.max(num, 1), 100);
  }

  copyText(): void {
    navigator.clipboard.writeText(this.generatedPassword);
    this.copyButtonText = 'Copied!';

    setTimeout(() => {
      this.copyButtonText = 'Copy Password';
    }, 2000);
  }

  generatePassword(): void {
    let characters = '';
    let password = '';

    if (this.includeAlphabets) {
      characters += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    if (this.includeNumbers) {
      characters += '1234567890';
    }

    if (this.includeSpecialCharacters) {
      characters += '!@#$%^&*()_+~`|}{[]:;?><,./';
    }

    

    for (let i = 0; i < this.passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    this.generatedPassword = password;
  }
}
