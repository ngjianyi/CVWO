class User < ApplicationRecord
    has_many :forum_thread
    has_many :forum_comment
    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
end
