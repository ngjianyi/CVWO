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

user1 = User.create({
    username: "user 1",
    password: "user1"
})
user2 = User.create({
    username: "user 2",
    password: "user2"
})

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

thread1 = ForumThread.create({
    title: "Thread 1",
    content: "Thread 1 stuff",
    user_id: user2.id,
    author: user2.username,
    forum_category_id: category3.id
})
thread2 = ForumThread.create({
    title: "Thread 2",
    content: "Thread 2 stuff",
    user_id: user1.id,
    author: user1.username,
    forum_category_id: category4.id
})

ForumComment.create!([{
    content: "Comment 1",
    author: user1.username,
    forum_thread_id: thread1.id,
    user_id: user1.id
}, 
{
    content: "Comment 2",
    author: user2.username,
    forum_thread_id: thread1.id,
    user_id: user2.id
}, 
{
    content: "Comment 3",
    author: user1.username,
    forum_thread_id: thread2.id,
    user_id: user1.id
}])