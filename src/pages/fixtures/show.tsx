import { Fixtures, QrColor, Stroge } from "../../types";
import { initQRCode } from "@/lib/QRCode";
import QRCode from "../../components/QRCode";

const FixturesShow = (fixtures: Fixtures) => {
  return (<>
    <h1>{fixtures.name}</h1>
    <p>uuid: {fixtures.id}</p>
    <p>description</p>
    {fixtures.description?.split('\n').map(s => <p>{s}</p>)}
    <p>note: </p>
    {fixtures.note?.split('\n').map(s => <p>{s}</p>)}
  </>)
}

export default FixturesShow
