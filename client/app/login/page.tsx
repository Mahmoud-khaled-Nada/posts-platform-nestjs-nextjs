import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
          <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque ipsa
            culpa autem, at itaque nostrum!
          </p>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}
