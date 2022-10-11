import { APIRoute } from "next-s3-upload";
import shortId from "shortid";

export default APIRoute.configure({
  key(req, filename) {
    let id = req.body.id;
    return `${id}/${shortId.generate()}`;
  },
});
