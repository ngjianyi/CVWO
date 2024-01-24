# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

User.destroy_all
ForumCategory.destroy_all
ForumThread.destroy_all
ForumComment.destroy_all

category1 = ForumCategory.create({
    name: "Academics"
})
category2 = ForumCategory.create({
    name: "Residential"
})
category3 = ForumCategory.create({
    name: "Student Life"
})
category4 = ForumCategory.create({
    name: "Administrative"
})
category5 = ForumCategory.create({
    name: "Others"
})