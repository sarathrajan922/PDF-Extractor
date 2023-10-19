import UserPDFsModel, { PdfModel } from "../database/model/pdfModel";

const userHelper = () => {

  const uploadPdf = async (req: any) => {
    // todo get the userId from token
    const userId = "652f7ba2622aa21080bb460b";

    let user = await UserPDFsModel.findOne({ userId });

    if (!user) {
      user = new UserPDFsModel({ userId, originalPdfs: [], newPdfs: [] });
    }

    // Create a new PDF document and populate it with the uploaded file data
    const newPDF = new PdfModel({
      name: req.originalname,
      data: req.buffer,
      contentType: req.mimetype,
    });

    // Push the PDF to the user's array of PDFs
    user.originalPdfs.push(newPDF);

    // Save the user with the updated PDF array
    await user.save();
    return true;
  };

  const getPDF = async(userId:string,pdfId:string)=>{
    console.log(userId)
    console.log(pdfId)
    const user = await UserPDFsModel.findOne({ userId });
    if (!user) {
        return 'User not found';
      }
     // Find the PDF by its ID within the user's PDFs array
    const pdf = user.originalPdfs.id(pdfId);
    if (!pdf) {
        return 'PDF not found';
      }
     // Send the PDF as a response
    return pdf
  }

  return {
    uploadPdf,
    getPDF
  };
};

export default userHelper;
