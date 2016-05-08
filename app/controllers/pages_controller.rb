class PagesController < ApplicationController
  def index
  end

  def gallery
    # Photos and Videos
    @media = Medium.all
  end

  def resources
    # Training and Ordering Info
    @resources = Resource.all
  end
end
