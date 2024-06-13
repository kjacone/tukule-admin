import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private router: Router, public snackBar: MatSnackBar) {}
  getDate(date: any) {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }
  // Generate a token with a payload (e.g., user ID)
  public generateToken(): number {
    return Math.floor(Date.now() * 1000);
  }
  public isTokenExpired(token: number): boolean {
    return Date.now() >= token;
  }
  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('user_data'));
    } catch (error) {
      this.openSnackBarAction(
        'An error fetching user info. Please try again later.',
        'auth'
      );
    }
  }
  generateRestaurantCode(restaurantName: string): string {
    // Extract the first 3 characters of the restaurant name (avoid too long names)
    const namePart = restaurantName.substring(0, 3).toUpperCase();
    // Generate a random 4-digit number (0000 - 9999)
    const timestamp = Date.now().toLocaleString().substring(2, 4); // Get first 4 digits of timestamp in base 36
    console.log(timestamp);
    const randomNum = Math.floor(Math.random() * 10000); // Get random 4-digit number in base 36
    console.log(randomNum);
    // Combine name and number with a hyphen for readability
    return `${namePart}-${timestamp + randomNum}`;
  }
  generateRandomUid(): string {
    return uuid();
  }

  setRestaurant(data) {
    localStorage.setItem('rest_data', JSON.stringify(data));
  }

  getCurrentRestaurant() {
    try {
      return JSON.parse(localStorage.getItem('rest_data'));
    } catch (error) {
      this.openSnackBarAction(
        'An error fetching user info. Please try again later.',
        'auth'
      );
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'dismiss', {
      duration: 5000,
    });
  }
  openSnackBarAction(message: string, action: string) {
    this.snackBar
      .open(message, 'redirect', {
        duration: 5000,
      })
      .afterDismissed()
      .subscribe(() => this.router.navigate([action]));
  }
}
