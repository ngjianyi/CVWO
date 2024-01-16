class AddAuthorToForumThreads < ActiveRecord::Migration[7.1]
  def change
    add_column :forum_threads, :author, :string, null: false
  end
end
