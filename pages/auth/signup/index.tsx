import SignUpRectangle from '@/components/shapes/signup-rectangle';


export default function SignUp() {
  return (
    <section>
      <div
        className="h-screen w-full flex justify-between bg-cover bg-center relative"
        style={{
          backgroundImage: "url(/images/background-signup.png)",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="flex flex-col mt-8 px-4 z-10 lg:px-8 xl:px-12 xl:py-8">
          <p className="text-white font-comfortaa text-md md:text-xl lg:text-2xl xl:text-4xl 2xl:text-9xl mb-1">
            Transforme sua relação com o dinheiro.
          </p>
          <p className="text-white font-comfortaa font-medium text-[12px] md:text-sm lg:text-lg xl:text-xl 2xl:text-2xl">
            <span className="font-light">Orbs </span>
            simplifica! <span className="font-light">Você </span>
            realiza!
          </p>
        </div>

        <SignUpRectangle className="absolute right-0 top-0" />
      </div>
    </section>
  );
}
