class ForumThread < ApplicationRecord
    has_many :forum_comment
    validates :title, presence: true
    validates :content, presence: true
end
