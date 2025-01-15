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
  isSelectionValid: boolean = true;

  validateSelection(): void {
    this.isSelectionValid = this.includeAlphabets || this.includeNumbers;
  }

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

  shuffle(characters: string): string {
    const chars = characters.split('');

    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    return chars.join('');
  }

  generatePassword(): void {
    let password = '';
    let characters = '';

    if(this.includeAlphabets) {
      const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      characters += alphabets;
      password += alphabets[Math.floor(Math.random() * alphabets.length)];
    }

    if(this.includeNumbers) {
      const numbers = '1234567890';
      characters += numbers;
      password += numbers[Math.floor(Math.random() * numbers.length)];
    }

    if(this.includeSpecialCharacters) {
      const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./';
      characters += symbols;
      password += symbols[Math.floor(Math.random() * symbols.length)];
    }

    characters = this.shuffle(characters);

    for (let i = password.length; i < this.passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    password = this.shuffle(password);

    this.generatedPassword = password;
  }
}
