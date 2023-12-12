// Creates a login modal that is showed if the user is not signed in
import { LoginButton } from './authButtons';
import '@/app/globals.css';

export default function LoginModal() {
    return (
        <div className="z-10 fixed shadow top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] rounded-md dark:bg-neutral-900 bg-neutral-100 shadow p-6 items-center" id="loginModal" tabIndex={-1} aria-labelledby="loginModalLabel" aria-hidden="true">
            <h1 className="text-center">Please <LoginButton/> before continuing </h1>
        </div>
    )
}