class ForumThread < ApplicationRecord
    has_many :forum_comment, dependent: :destroy
    belongs_to :user
    belongs_to :forum_category
    validates :title, presence: true
    validates :content, presence: true
    validates :user_id, presence: true
    validates :forum_category_id, presence: true
end
