class ForumComment < ApplicationRecord
  belongs_to :forum_thread
  belongs_to :user
  validates :content, presence: true
  validates :author, presence: true
end
