import gigModel from "../models/gigModel.js";

import { fileSizeFormatter } from "../utils/fileUpload.js";
import cloudinary from "../utils/cloudinary.js";

class gigController {
  static createGig = async (req, res, next) => {
    try {
      const { _id, isSeller } = req.user;
      if (!isSeller) {
        res.status(400);
        throw new Error("Only sellers can create new gig");
      }
      const {
        title,
        desc,
        category,
        price,
        shortTitle,
        shortDesc,
        deliveryTime,
        revisionNumber,
        features,
        totalStars,
        starNumber,
        sales,
      } = req.body;

      if (
        !title ||
        !desc ||
        !category ||
        !price ||
        !shortTitle ||
        !shortDesc ||
        !deliveryTime ||
        !revisionNumber ||
        !features
      ) {
        res.status(400);
        throw new Error("Please Fill All the required Details");
      }

      let fileData = {};
      if (req.file) {
        let uploadFile;
        try {
          uploadFile = await cloudinary.uploader.upload(req.file.path, {
            folder: "freelance_app",
            resource_type: "image",
          });
        } catch (error) {
          res.status(400);
          throw new Error("Image cannot be uploaded");
        }

        fileData = {
          fileName: req.file.originalname,
          filepath: uploadFile.secure_url,
          fileType: req.file.mimetype,
          fileSize: fileSizeFormatter(req.file.size, 2),
        };
      }
      let multipleFileData = [];

      if (req.files && req.files.length > 0) {
        await Promise.all(
          req.files.map(async (file) => {
            let fileData = {};
            let uploadFile;
            try {
              uploadFile = await cloudinary.uploader.upload(file.path, {
                folder: "freelance_app",
                resource_type: "image",
              });
            } catch (error) {
              res.status(400);
              throw new Error("Image cannot be uploaded");
            }

            fileData = {
              fileName: req.file.originalname,
              filepath: uploadFile.secure_url,
              fileType: req.file.mimetype,
              fileSize: fileSizeFormatter(req.file.size, 2),
            };

            multipleFileData.push(fileData);
          })
        );
      }

      let imageArray = [];

      if (multipleFileData) {
        multipleFileData.map(async (singleObject) => {
          imageArray.push(singleObject.filepath);
        });
      }

      const newGig = await gigModel.create({
        title: title,
        desc: desc,
        category: category,
        price: price,
        shortTitle: shortTitle,
        shortDesc: shortDesc,
        deliveryTime: deliveryTime,
        revisionNumber: revisionNumber,
        features: features,
        totalStars: totalStars,
        starNumber: starNumber,
        sales: sales,
        userId: _id,
        coverImage: fileData.filepath,
        // images: imageArray
      });

      if (newGig) {
        res.status(200).json(newGig);
      } else {
        res.status(400);
        throw new Error("Problem in uploading the gig");
      }
    } catch (error) {
      next(error);
    }
  };

  static deleteGig = async (req, res, next) => {
    try {
      const { _id } = req.user;

      const gigToDelete = await gigModel.findById(req.params.gigId);

      if (gigToDelete) {
        if (JSON.stringify(gigToDelete.userId) !== JSON.stringify(_id)) {
          res.status(400);
          throw new Error("You can only delete you gig");
        } else {
          await gigModel.findByIdAndDelete(req.params.gigId);
          res.status(200).json({ message: "Successfully deleted the gig" });
        }
      } else {
        res.status(400);
        throw new Error("Error while deleting the gig");
      }
    } catch (error) {
      next(error);
    }
  };

  static getSingleGig = async (req, res, next) => {
    try {
      const { gigId } = req.params;

      const gig = await gigModel.findById(gigId);

      if (gig) {
        res.status(200).json(gig);
      } else {
        res.status(400);
        throw new Error("Gig not found , maybe it got deleted");
      }
    } catch (error) {
      next(error);
    }
  };

  static getAllGigs = async (req, res, next) => {
    const query = req.query;

    const filters = {
      ...(query.userId && { userId: { $regex: query.userId } }),
      ...(query.category && { category: { $regex: query.category } }),
      ...(query.title && { title: { $regex: query.search, $options: "i" } }),
      ...((query.min || query.max) && {
        price: {
          ...(query.min && { $gt: query.min }),
          ...(query.max && { $lt: query.max }),
        },
      }),
    };

    try {
      const gigs = await gigModel.find(filters);

      res.status(200).json(gigs);
    } catch (error) {
      next(error);
    }
  };
}

export default gigController;
