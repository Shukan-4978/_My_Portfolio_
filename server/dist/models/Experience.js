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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const experienceSchema = new mongoose_1.Schema({
    company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
        maxlength: [150, 'Company name cannot exceed 150 characters'],
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        trim: true,
        maxlength: [150, 'Role cannot exceed 150 characters'],
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
    },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: {
        type: [String],
        required: [true, 'Description is required'],
        validate: {
            validator: (v) => v.length > 0,
            message: 'At least one description bullet point is required',
        },
    },
    logo: { type: String, trim: true },
    type: {
        type: String,
        required: [true, 'Experience type is required'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
    },
    skills: { type: [String], default: [] },
    order: { type: Number, default: 0 },
}, {
    timestamps: true,
});
experienceSchema.index({ order: 1 });
experienceSchema.index({ current: -1, startDate: -1 });
const Experience = mongoose_1.default.model('Experience', experienceSchema);
exports.default = Experience;
//# sourceMappingURL=Experience.js.map