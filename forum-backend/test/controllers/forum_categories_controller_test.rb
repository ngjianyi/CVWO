require "test_helper"

class ForumCategoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @forum_category = forum_categories(:one)
  end

  test "should get index" do
    get forum_categories_url, as: :json
    assert_response :success
  end

  test "should create forum_category" do
    assert_difference("ForumCategory.count") do
      post forum_categories_url, params: { forum_category: { name: @forum_category.name } }, as: :json
    end

    assert_response :created
  end

  test "should show forum_category" do
    get forum_category_url(@forum_category), as: :json
    assert_response :success
  end

  test "should update forum_category" do
    patch forum_category_url(@forum_category), params: { forum_category: { name: @forum_category.name } }, as: :json
    assert_response :success
  end

  test "should destroy forum_category" do
    assert_difference("ForumCategory.count", -1) do
      delete forum_category_url(@forum_category), as: :json
    end

    assert_response :no_content
  end
end
