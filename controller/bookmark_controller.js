const Bookmark = require("../models/bookmarks_model");

/* Add selected post to the bookmark */
exports.addBookmark = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.user;

  try {
    const bookmarks = await Bookmark.find({
      user: userId,
      post: postId,
    });
    if (bookmarks.length > 0) {
      return res.status(400).json({
        message: "You have already bookmarked",
      });
    }
    const newBookmark = new Bookmark({
      user: userId,
      post: postId,
    });
    await newBookmark.save();
    return res.status(200).json({
      message: "Post bookmarked successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

/* Remove selected post from the bookmark */
exports.removeBookmark = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.user;

  try {
    const bookmarks =
      await Bookmark.findOneAndDelete({
        user: userId,
        post: postId,
      });
    if (!bookmarks) {
      return res.status(400).json({
        message:
          "You have not bookmarked this post",
      });
    }
    return res.status(200).json({
      message: "Post removed from bookmark",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

/* Get all the bookmarked posts with logged in user and latest bookmarked post */
exports.getBookmarks = async (req, res) => {
  const { userId } = req.user;

  try {
    const bookmarks = await Bookmark.find({
      user: userId,
    })
      .sort({ createdAt: -1 })
      .populate("post");
    if (bookmarks.length === 0) {
      return res.status(400).json({
        message: "No bookmarked posts found",
      });
    }
    return res.status(200).json({
      message: "Bookmarks found",
      data: bookmarks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};