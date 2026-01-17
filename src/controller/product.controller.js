import cloudinary from "../cloudinary/config.js";
import Products from "../models/Product.model.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const getAllProduct = asyncHandler(async (req, res) => {
    const product = await Products.find({})
    if (!product) {
        throw new ApiErrors(404, 'product not found')
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, product, 'product fetched successfully')
        )
})

export const addProduct = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        price,
        discountPrice,
        countInStock,
        sku,
        category,
        brand,
        sizes,
        colors,
        collections,
        material,
        gender,
        tags
    } = req.body;

    if (
        !name ||
        !description ||
        !price ||
        !countInStock ||
        !sku ||
        !category ||
        !Array.isArray(sizes) || sizes.length === 0 ||
        !Array.isArray(colors) || colors.length === 0 ||
        !collections
    ) {
        throw new ApiErrors(400, "All fields are required");
    }

    // Images handle
    const files = req.files;
    const imageUrls = [];
    const uploadedPublicIds = [];

    try {
        if (!files || files.length === 0) {
            throw new ApiErrors(400, "Image is required");
        }

        for (const file of files) {
            const uploaded = await uploadToCloudinary(file.buffer, "addvance-edu-products");

            imageUrls.push({
                url: uploaded.secure_url,
                imagePublicIds: uploaded.public_id,
                altText: name
            });

            uploadedPublicIds.push(uploaded.public_id);
        }

    } catch (err) {
        // CLEANUP on upload failure
        for (const pid of uploadedPublicIds) {
            await cloudinary.uploader.destroy(pid);
        }
        throw new ApiErrors(400, "Image upload failed", err);
    }

    try {
        const product = await Products.create({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            sku,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            tags,
            user: req.user._id,
            images: imageUrls
        });

        return res.status(200).json(
            new ApiResponse(200, product, "Product saved successfully")
        );

    } catch (error) {
        for (const pid of uploadedPublicIds) {
            await cloudinary.uploader.destroy(pid);
        }

        throw new ApiErrors(400, error.message);
    }
});

export const getProductById = asyncHandler(async (req, res) => {
    const { _id: productId } = req.params
    const product = await Products.findById(productId)
    if (!product) {
        throw new ApiErrors(404, 'product not found')
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, product, 'product fetched successfully')
        )
})