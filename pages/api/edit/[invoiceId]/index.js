import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  const { invoiceId } = req.query;
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.USER__NAME}:${process.env.USER__PASSWORD}@cluster0.ishut.mongodb.net/${process.env.DATABASE__NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  );
  const db = client.db();
  const collection = db.collection("allInvoices");

  if (req.method === "PUT") {
    await collection.updateOne(
      {
        _id: ObjectId(invoiceId),
      },
      {
        $set: {
          senderAddress: {
            street: req.body.senderStreet,
            city: req.body.senderCity,
            postalCode: req.body.senderPostalCode,
            country: req.body.senderCountry,
          },
          clientName: req.body.clientName,
          clientEmail: req.body.clientEmail,
          clientAddress: {
            street: req.body.clientStreet,
            city: req.body.clientCity,
            postalCode: req.body.clientPostalCode,
            country: req.body.clientCountry,
          },
          createdAt: req.body.createdAt,
          paymentDue: req.body.createdAt,
          paymentTerms: req.body.paymentTerms,
          description: req.body.description,
          status: req.body.status,
          items: req.body.items,
          total: req.body.total,
        },
      }
    );

    res.status(200).json({ message: "Invoice updated successfully" });
  }

  client.close();
}

export default handler;
