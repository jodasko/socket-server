import { Router, Response, Request } from "express";

const router = Router();

router.get("/messages", (req: Request, resp: Response) => {
  resp.json({
    ok: true,
    message: "It is alright!!",
  });
});

router.post("/messages/:id", (req: Request, resp: Response) => {
  const bodyText = req.body.bodyText;
  const from = req.body.from;
  const id = req.params.id;
  resp.json({
    ok: true,
    message: "POSR - it is ready!",
    bodyText: bodyText,
    from: from,
    id: id,
  });
});

export default router;
