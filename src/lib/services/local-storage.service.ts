const USER_EMAIL_KEY = 'user-email';

function getUserEmail(): string {
	return localStorage.getItem(USER_EMAIL_KEY) ?? '';
}

function saveUserEmail(email: string): void {
	localStorage.setItem(USER_EMAIL_KEY, email);
}

const storageService = {
	getUserEmail,
	saveUserEmail
};

export default storageService;
