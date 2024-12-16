import logo from '../../assets/LOGO.svg'
export default function AuthWrapper({
  children,
  pageImage,
}: {
  children: React.ReactNode;
  pageImage?: string;
}) {
//   
  return (
    <section className="flex justify-between items-center min-h-screen min-w-screen ">

<img src={logo} className="absolute md:top-4 md:left-4  top-4 left-1/2 transform -translate-x-1/2 md:transform-none  h-6 3xl:h-8" />
   {children}
    <img src={pageImage} alt="Login Image" className="bg-cover  w-1/2 min-h-[95vh] m-4 rounded-md  hidden md:block" />
</section>
  );
}
