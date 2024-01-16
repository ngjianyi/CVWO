class ForumCategory < ApplicationRecord
    has_many :forum_thread
    validates :name, presence: true
end
