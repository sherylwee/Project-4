json.extract! user, :id, :name, :contact, :email, :references, :created_at, :updated_at
json.url user_url(user, format: :json)
