module Jekyll
  module SidebarItemFilter
    def docs_sidebar_link(item, baseurl)
      return sidebar_helper(item, 'docs')
    end

    def ios_sidebar_link(item, baseurl)
      return sidebar_helper(item, baseurl, 'ios')
    end

    def android_sidebar_link(item, baseurl)
      return sidebar_helper(item, baseurl, 'android')
    end

    def glossary_sidebar_link(item, baseurl)
      return sidebar_helper(item, baseurl, 'glossary')
    end

    def unity_sidebar_link(item, baseurl)
        return sidebar_helper(item, baseurl, 'unity')
    end

    def flutter_sidebar_link(item, baseurl)
        return sidebar_helper(item, baseurl, 'flutter')
    end

    def cordova_sidebar_link(item, baseurl)
        return sidebar_helper(item, baseurl, 'cordova')
    end

    def faq_sidebar_link(item, baseurl)
        return sidebar_helper(item, baseurl, 'faq')
    end

    def windows_sidebar_link(item, baseurl)
      return sidebar_helper(item, baseurl, 'windows')
    end

    def guides_sidebar_link(item, baseurl)
          return sidebar_helper(item, baseurl, 'guides')
    end

    def mobile_usecases_sidebar_link(item, baseurl)
          return sidebar_helper(item, baseurl, 'mobile-usecases')
    end

    def panel_sidebar_link(item, baseurl)
        return sidebar_helper(item, baseurl, 'panel')
    end

    def javascript_sidebar_link(item, baseurl)
          return sidebar_helper(item, baseurl, 'javascript')
    end

    def react_native_sidebar_link(item, baseurl)
          return sidebar_helper(item, baseurl, 'react-native')
    end

    def react_native_bridge_sidebar_link(item, baseurl)
          return sidebar_helper(item, baseurl, 'react-native-bridge')
    end

    def rest_api_sidebar_link(item, baseurl)
          return sidebar_helper(item, baseurl, 'rest-api')
    end

    def sidebar_helper(item, baseurl, group)
      forceInternal = item["forceInternal"]

      subItems = item["subitems"]
      pageID = @context.registers[:page]["id"]
      itemID = item["id"]
      if item["href"] != nil
        href = "#{pageID}.html##{item["href"]}" || "/#{group}/#{itemID}.html"
        itemID = pageID
      else
        href = item["href"] || "/#{group}/#{itemID}.html"
      end
      classes = []
      if pageID == itemID
        classes.push("active")
      end
      if item["href"] && (forceInternal == nil)
        classes.push("external")
      end
      className = classes.size > 0  ? " class=\"#{classes.join(' ')}\"" : ""

      result = ""
      if subItems != nil && pageID == itemID
        result = "<ul><a href=\"#{baseurl}#{href}\"#{className}>#{item["title"]}</a>"
        subItems.each {|curItem|
          result += "<li><a style='font-size: 12px;' href=\"#{baseurl}#{pageID}.html##{curItem["href"]}\">#{curItem["title"]}</a></li>"
        }
        result += "</ul>"
      else
        result = "<a href=\"#{baseurl}#{href}\"#{className}>#{item["title"]}</a>"
      end
      return result
    end

  end
end

Liquid::Template.register_filter(Jekyll::SidebarItemFilter)
