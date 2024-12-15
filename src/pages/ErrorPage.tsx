import {useNavigate} from "react-router-dom";

export const ErrorPage = () => {
  const navigate = useNavigate();
  return (
      <div className={"container border rounded-4 user-select-none text-center mt-5"}
           style={{padding: "10rem", color: "#343434"}}>
        <div className="text-center d-flex justify-content-center align-items-center" style={{height: "50vh"}}>
          <div>
            <img src={"/notFound.svg"} className={"img-fluid w-25"}/>
            <p className={"py-2"}>Bugun uyga qaytamiz o'g'lim :)</p>
            <button className={"btn btn-primary text-white"} onClick={()=>navigate(-1)}>Uyga qaytish</button>
          </div>
        </div>
      </div>
  )
}
