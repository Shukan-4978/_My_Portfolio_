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
const achievementSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Achievement title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    type: {
        type: String,
        required: [true, 'Achievement type is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    icon: { type: String, trim: true },
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    url: { type: String, trim: true },
    rank: { type: String, trim: true },
}, {
    timestamps: true,
});
achievementSchema.index({ date: -1 });
achievementSchema.index({ type: 1 });
const Achievement = mongoose_1.default.model('Achievement', achievementSchema);
exports.default = Achievement;
//# sourceMappingURL=Achievement.js.map