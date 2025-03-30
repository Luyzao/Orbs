import SignUpRectangle from '@/components/shapes/signup-rectangle';

export default function SignUp() {
  return (
    <section>
      <div 
        className="h-screen w-full flex justify-end bg-cover bg-center relative" 
        style={{ backgroundImage: "url(/images/background-signup.png)", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        
        <SignUpRectangle className="absolute right-0 top-0" />
      </div>
    </section>
  );
}
