class User < ApplicationRecord
    has_many :forum_thread, dependent: :destroy
    has_many :forum_comment, dependent: :destroy
    has_secure_password
    validates :username, presence: true, uniqueness: { case_sensitive: true }
    validates :password,
               confirmation: { case_sensitive: true },
               length: { minimum: 6 },
               if: -> { new_record? || !password.nil? }
    validates :password_confirmation, presence: true
end
