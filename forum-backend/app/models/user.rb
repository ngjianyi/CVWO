class User < ApplicationRecord
    has_many :forum_thread, dependent: :destroy
    has_many :forum_comment, dependent: :destroy
    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
end
