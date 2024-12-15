export const Empty = () => {
  return (
      <div className={"w-full border rounded-4 user-select-none text-center mt-5"}
           style={{padding: "10rem", color: "#eee"}}>
        <div className="text-center d-flex justify-content-center align-items-center" style={{height: "50vh"}}>
          <div>
            <img src={"/notFound.svg"} className={"img-fluid w-25"}/>
            <p className={"py-3"}>Ma'lumotlar topilmadi!</p>
          </div>
        </div>
      </div>
  )
}
