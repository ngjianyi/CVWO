class ForumComment < ApplicationRecord
  belongs_to :forum_thread
  belongs_to :user
  validates :content, presence: true
  validates :forum_thread_id, presence: true
  validates :user_id, presence: true
end
