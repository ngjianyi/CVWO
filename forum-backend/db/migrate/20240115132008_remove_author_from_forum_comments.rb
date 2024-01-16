class RemoveAuthorFromForumComments < ActiveRecord::Migration[7.1]
  def change
    remove_column :forum_comments, :author, :string
  end
end
