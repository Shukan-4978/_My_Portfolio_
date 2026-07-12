"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
    },
    excerpt: {
        type: String,
        required: [true, 'Excerpt is required'],
        trim: true,
        maxlength: [500, 'Excerpt cannot exceed 500 characters'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    tags: { type: [String], default: [] },
    readTime: {
        type: Number,
        required: [true, 'Read time is required'],
        min: [1, 'Read time must be at least 1 minute'],
    },
    coverImage: { type: String, trim: true },
    publishedAt: { type: Date },
    featured: { type: Boolean, default: false },
    draft: { type: Boolean, default: true },
}, {
    timestamps: true,
});
// Auto-generate slug from title before saving
blogSchema.pre('save', async function (next) {
    if (!this.isModified('title') && this.slug)
        return next();
    let baseSlug = (0, slugify_1.default)(this.title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 0;
    // Ensure unique slug
    while (true) {
        const existing = await mongoose_1.default
            .model('Blog')
            .findOne({ slug, _id: { $ne: this._id } });
        if (!existing)
            break;
        counter++;
        slug = `${baseSlug}-${counter}`;
    }
    this.slug = slug;
    next();
});
blogSchema.index({ slug: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ draft: 1, publishedAt: -1 });
blogSchema.index({ featured: -1, publishedAt: -1 });
const Blog = mongoose_1.default.model('Blog', blogSchema);
exports.default = Blog;
//# sourceMappingURL=Blog.js.map