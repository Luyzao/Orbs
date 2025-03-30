import { getTeste } from "@/services/teste";


export default function Home() {
  const teste = async () =>{
    await getTeste()
    .then((response)=>{
      console.log(response.data)
    }).catch((error)=>{
      console.error(error,"AQUIIIIIIII")
    })
  }

  teste();

  return (
   <section>
      
    
   </section>
  );
}
