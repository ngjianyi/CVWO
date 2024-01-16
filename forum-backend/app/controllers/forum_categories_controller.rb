class ForumCategoriesController < ApplicationController
  before_action :set_forum_category, only: %i[ show update destroy ]

  # GET /forum_categories
  def index
    @forum_categories = ForumCategory.all

    render json: @forum_categories
  end

  # GET /forum_categories/1
  def show
    render json: @forum_category
  end

  # POST /forum_categories
  def create
    @forum_category = ForumCategory.new(forum_category_params)

    if @forum_category.save
      render json: @forum_category, status: :created, location: @forum_category
    else
      render json: @forum_category.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /forum_categories/1
  def update
    if @forum_category.update(forum_category_params)
      render json: @forum_category
    else
      render json: @forum_category.errors, status: :unprocessable_entity
    end
  end

  # DELETE /forum_categories/1
  def destroy
    @forum_category.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_forum_category
      @forum_category = ForumCategory.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def forum_category_params
      params.require(:forum_category).permit(:name)
    end
end
