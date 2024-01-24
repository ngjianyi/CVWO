class ForumCommentsController < ApplicationController
  before_action :authorized, only: [:create, :update, :destroy]
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

  # GET /comment_filter_thread/1 Filter by thread
  def filter_thread
    @comments = ForumComment.all.order(created_at: :desc).select { |comment| comment.forum_thread_id == Integer(params[:forum_thread_id]) }
    @full_comments = @comments.map{ |comment| {comment: comment, author: comment.user.username }}
    render json: @full_comments
  end

  # GET /comment_filter_user/1 Filter by user
  def filter_user
    @user = User.find_by_username(params[:username])
    @comments = ForumComment.all.order(created_at: :desc).select { |comment| comment.user_id == @user[:id]  }
    @full_comments = @comments.map{ |comment| {comment: comment, author: comment.user.username }}
    render json: @full_comments
  end

  # POST /forum_comments
  def create
    updated_params = forum_comment_params.clone
    updated_params[:user_id] = current_user[:id] unless current_user.nil?
    @forum_comment = ForumComment.new(updated_params)

    if @forum_comment.save
      render json: @forum_comment, status: :created, location: @forum_comment
    else
      render json: @forum_comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /forum_comments/1
  def update
    # Check if jwt cookies' user is same as thread's author
    if @forum_comment[:user_id] == current_user[:id]
      if @forum_comment.update(forum_comment_params)
        render json: @forum_comment
      else
        render json: @forum_comment.errors, status: :unprocessable_entity
      end
    else
      render json: @forum_comment.errors, status: :unauthorized
    end
  end

  # DELETE /forum_comments/1
  def destroy
    # Check if jwt cookies' user is same as thread's author
    if @forum_comment[:user_id] == current_user[:id]
      @forum_comment.destroy!
    else
      render json: @forum_comment.errors, status: :unauthorized
    end
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
