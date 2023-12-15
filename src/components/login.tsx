// Creates a login modal that is showed if the user is not signed in
import { LoginButton } from './authButtons';
import '@/app/globals.css';

export default function LoginModal() {
    return (
        <div className="z-10 absolute shadow-xl top-1/2 left-1/2 border dark:border-neutral-800 transform translate-x-[-50%] translate-y-[-50%]">
            <LoginButton/>
        </div>
    )
}