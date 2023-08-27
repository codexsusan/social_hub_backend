const {
  mongoose,
  Schema,
} = require("../utils/mongoose_db_schema");

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    post_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    upvotes: {
      type: Array,
      required: true,
      default: [],
    },
    downvotes: {
      type: Array,
      required: true,
      default: [],
    },
    upvotes_count: {
      type: Number,
      required: true,
      default: 0,
    },
    downvotes_count: {
      type: Number,
      required: true,
      default: 0,
    },
    report_count: {
      type: Number,
      required: true,
      default: 0,
    },

    //Admin,Moderator or User
    comment_context: {
      type: String,
      required: true,
      enum: ["ADMIN", "MODERATOR", "USER"],
    },
    parent_type: {
      type: String,
      required: true,
      enum: ["POST", "COMMENT"],
    },
    parent_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Comment",
  commentSchema
);
