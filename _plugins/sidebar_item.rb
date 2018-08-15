module Jekyll
  module SidebarItemFilter
    def docs_sidebar_link(item)
      return sidebar_helper(item, 'docs')
    end

    def ios_sidebar_link(item)
      return sidebar_helper(item, 'ios')
    end

    def android_sidebar_link(item)
      return sidebar_helper(item, 'android')
    end

    def windows_sidebar_link(item)
      return sidebar_helper(item, 'windows')
    end
    
     def rest_api_sidebar_link(item)
      return sidebar_helper(item, 'rest-api')
    end

    def panel_sidebar_link(item)
        return sidebar_helper(item, 'panel')
    end

    def javascript_sidebar_link(item)
          return sidebar_helper(item, 'javascript')
    end

    def react_native_sidebar_link(item)
          return sidebar_helper(item, 'react-native')
    end

    def react_native_bridge_sidebar_link(item)
          return sidebar_helper(item, 'react-native-bridge')
    end

    def rest_api_sidebar_link(item)
          return sidebar_helper(item, 'rest-api')
    end

    def sidebar_helper(item, group)
      forceInternal = item["forceInternal"]

      pageID = @context.registers[:page]["id"]
      itemID = item["id"]
      href = item["href"] || "/#{group}/#{itemID}.html"
      classes = []
      if pageID == itemID
        classes.push("active")
      end
      if item["href"] && (forceInternal == nil)
        classes.push("external")
      end
      className = classes.size > 0  ? " class=\"#{classes.join(' ')}\"" : ""

      return "<a href=\"#{href}\"#{className}>#{item["title"]}</a>"
    end

  end
end

Liquid::Template.register_filter(Jekyll::SidebarItemFilter)
