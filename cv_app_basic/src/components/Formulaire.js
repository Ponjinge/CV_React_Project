
export default function Formulaire({

  item

}) {


  //Log for debugging and testing
  console.log("item", item);

 

  return (
    <p >
   
        <p >
          <div>
            {item.name}
          </div>
          <div>
            {item.research.length} Articles
          </div>
        </p>
    </p>
  );
}

