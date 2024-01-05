require "test_helper"

class ForumCommentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @forum_comment = forum_comments(:one)
  end

  test "should get index" do
    get forum_comments_url, as: :json
    assert_response :success
  end

  test "should create forum_comment" do
    assert_difference("ForumComment.count") do
      post forum_comments_url, params: { forum_comment: { author: @forum_comment.author, content: @forum_comment.content, forum_thread_id: @forum_comment.forum_thread_id, user_id: @forum_comment.user_id } }, as: :json
    end

    assert_response :created
  end

  test "should show forum_comment" do
    get forum_comment_url(@forum_comment), as: :json
    assert_response :success
  end

  test "should update forum_comment" do
    patch forum_comment_url(@forum_comment), params: { forum_comment: { author: @forum_comment.author, content: @forum_comment.content, forum_thread_id: @forum_comment.forum_thread_id, user_id: @forum_comment.user_id } }, as: :json
    assert_response :success
  end

  test "should destroy forum_comment" do
    assert_difference("ForumComment.count", -1) do
      delete forum_comment_url(@forum_comment), as: :json
    end

    assert_response :no_content
  end
end
