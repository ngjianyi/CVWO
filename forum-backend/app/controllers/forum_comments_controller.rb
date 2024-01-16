class ForumCommentsController < ApplicationController
  before_action :set_forum_comment, only: %i[ show update destroy ]

  # GET /forum_comments
  def index
    @forum_comments = ForumComment.all

    render json: @forum_comments
  end

  # GET /forum_comments/1
  def show
    render json: @forum_comment
  end

  # GET specific thread's comments
  def thread_comments
    @comments = ForumComment.all.order(created_at: :desc).select { |comment| comment.forum_thread_id == Integer(params[:forum_thread_id]) }
    @full_comments = @comments.map{ |comment| {comment: comment, author: comment.user.username }}
    render json: @full_comments
  end

  # POST /forum_comments
  def create
    @forum_comment = ForumComment.new(forum_comment_params)

    if @forum_comment.save
      render json: @forum_comment, status: :created, location: @forum_comment
    else
      render json: @forum_comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /forum_comments/1
  def update
    if @forum_comment.update(forum_comment_params)
      render json: @forum_comment
    else
      render json: @forum_comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /forum_comments/1
  def destroy
    @forum_comment.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_forum_comment
      @forum_comment = ForumComment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def forum_comment_params
      params.require(:forum_comment).permit(:id, :content, :forum_thread_id, :user_id)
    end
end
