class ContactsController < ApplicationController
  def index
    # Administrative Contacts
    @contact = Contact.new
  end

  def contact_us
    # Contact form logic here
  end
end
