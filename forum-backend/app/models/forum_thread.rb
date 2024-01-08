class ForumThread < ApplicationRecord
    has_many :forum_comment
    belongs_to :user
    validates :title, presence: true
    validates :content, presence: true
    validates :author, presence: true
end
