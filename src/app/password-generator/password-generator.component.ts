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
    // UPDATE - Changed password string to be an array of strings to store each character at random indexes
    let passwordArray: string[] = [];
    let characters = '';
  
    // Adding alphabets if selected
    if (this.includeAlphabets) {
      const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const randomChar = alphabets[Math.floor(Math.random() * alphabets.length)];
      const randomIndex = Math.floor(Math.random() * this.passwordLength);

      characters += alphabets;
      passwordArray[randomIndex] = randomChar;
    }
  
    // Adding numbers if selected
    if (this.includeNumbers) {
      const numbers = '1234567890';
      let randomChar;
      let randomIndex;
      
      // Using do while to not overwrite the character set in the previous if statement
      do {
        randomChar = numbers[Math.floor(Math.random() * numbers.length)];
        randomIndex = Math.floor(Math.random() * this.passwordLength);
      } while (passwordArray[randomIndex] !== undefined);

      characters += numbers;
      passwordArray[randomIndex] = randomChar;
    }
  
    // Adding special characters if selected
    if (this.includeSpecialCharacters) {
      const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./';
      let randomChar;
      let randomIndex;
      
      // Using do while to not overwrite the character set in the previous if statement
      do {
        randomChar = symbols[Math.floor(Math.random() * symbols.length)];
        randomIndex = Math.floor(Math.random() * this.passwordLength);
      } while (passwordArray[randomIndex] !== undefined);

      characters += symbols;
      passwordArray[randomIndex] = randomChar;
    }

    // Shuffling the characters array to generate a random array for character selection.
    characters = this.shuffle(characters);

    // Filling the remaining slots with random characters
    for (let i = 0; i < this.passwordLength; i++) {
      if (passwordArray[i] === undefined) {
        const randomChar = characters[Math.floor(Math.random() * characters.length)];
        passwordArray[i] = randomChar;
      }
    }
  
    // Joining the array into a string and setting it to generated password
    this.generatedPassword = passwordArray.join('');
  }
}
