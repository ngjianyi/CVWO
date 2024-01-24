class User < ApplicationRecord
    has_many :forum_thread, dependent: :destroy
    has_many :forum_comment, dependent: :destroy
    has_secure_password
    validates :username, presence: true, uniqueness: { case_sensitive: true }
    validates :password,
               confirmation: { case_sensitive: true },
               length: { minimum: 8 },
               if: -> { new_record? || !password.nil? },
               format: /\A # Start of string
                    (?=.*\d) # Contains at least one number
                    (?=.*[a-z]) # Contains at least one lowercase letter
                    (?=.*[A-Z]) # Contains at least one Uppercase letter
                        /x # End of string
    validates :password_confirmation, presence: true
end
